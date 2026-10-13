#!/usr/bin/env node
// Regenerates src/data/youtube-library.json from the public AZPVA YouTube channel.
// Requires yt-dlp on PATH (pip install yt-dlp). No API key needed.
// Usage: node scripts/sync-youtube.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const CHANNEL = 'https://www.youtube.com/@ArizonapolevaultacademyQC/playlists';
const OUT = new URL('../src/data/youtube-library.json', import.meta.url);
const ytdlp = (url) => JSON.parse(execFileSync('yt-dlp', ['--flat-playlist', '-J', url], { maxBuffer: 1 << 28 }).toString());
const slugify = (s) => s.toLowerCase().replace(/^exercise library\s*-\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// Keep any hand-written descriptions from a previous run.
const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { playlists: [] };
const prevDesc = Object.fromEntries(prev.playlists.map((p) => [p.id, p.description]));

const channel = ytdlp(CHANNEL);
const playlists = [];
// Scope: ONLY instructional exercise/drill playlists (titled "Exercise Library - ...").
// Vlogs, entertainment, meet footage, athlete/club playlists are intentionally excluded.
const INCLUDE = /^(exercise library|pedestal$)/i; // "Pedestal" = core pedestal exercise series
const EXCLUDE_VIDEO_IDS = new Set([]); // add IDs of non-drill videos found inside drill playlists
for (const entry of channel.entries.filter((e) => INCLUDE.test(e.title || ''))) {
  const pl = ytdlp(`https://www.youtube.com/playlist?list=${entry.id}`);
  const videos = (pl.entries || [])
    .filter((v) => v && !EXCLUDE_VIDEO_IDS.has(v.id))
    .filter((v) => v && v.id && v.title && !/^\[(private|deleted) video\]$/i.test(v.title))
    .map((v) => ({ id: v.id, title: v.title, thumbnail: thumb(v.id), duration: v.duration ?? null }));
  playlists.push({
    id: entry.id,
    title: pl.title || entry.title,
    slug: slugify(pl.title || entry.title),
    description: prevDesc[entry.id] || pl.description || '',
    videoCount: videos.length,
    thumbnail: videos[0]?.thumbnail ?? null,
    videos,
  });
  console.log(`${pl.title}: ${videos.length}`);
}
writeFileSync(OUT, JSON.stringify({ channel: CHANNEL, syncedAt: new Date().toISOString(), playlists }, null, 2) + '\n');
console.log(`Wrote ${playlists.length} playlists`);
