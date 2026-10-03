import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Album = CollectionEntry<'albums'>;
export type Photo = CollectionEntry<'photos'>;

const kindLabel: Record<Album['data']['kind'], string> = {
  camp: 'Camp',
  event: 'Event',
  archive: 'Archive',
};

export function albumKindLabel(kind: Album['data']['kind']) {
  return kindLabel[kind];
}

/** Month and year only — album dates mark the event month, not a specific day. */
export function formatAlbumDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function photoCountLabel(count: number) {
  return count === 1 ? '1 photo' : `${count} photos`;
}

function comparePhotos(a: Photo, b: Photo) {
  const ad = a.data.date?.valueOf() ?? Number.POSITIVE_INFINITY;
  const bd = b.data.date?.valueOf() ?? Number.POSITIVE_INFINITY;
  if (ad !== bd) return ad - bd;
  return a.id.localeCompare(b.id);
}

function sortTimestamp(album: Album, albumPhotos: Photo[]) {
  const stamps = [
    album.data.date?.valueOf(),
    ...albumPhotos.map((photo) => photo.data.date?.valueOf()),
  ].filter((value): value is number => value != null);
  if (!stamps.length) return null;
  return Math.max(...stamps);
}

export async function loadPhotoArchive() {
  const [albums, photos] = await Promise.all([getCollection('albums'), getCollection('photos')]);

  const albumIds = new Set(albums.map((album) => album.id));
  for (const photo of photos) {
    if (!albumIds.has(photo.data.album)) {
      throw new Error(
        `Photo "${photo.id}" is filed under unknown album "${photo.data.album}". Add src/content/albums/${photo.data.album}.md or fix the album id.`,
      );
    }
    const filePath = join(process.cwd(), 'public', photo.data.src.replace(/^\//, ''));
    if (!existsSync(filePath)) {
      throw new Error(`Photo "${photo.id}" points at missing file ${photo.data.src}`);
    }
  }

  const photosByAlbum = new Map<string, Photo[]>();
  for (const photo of photos) {
    const list = photosByAlbum.get(photo.data.album) ?? [];
    list.push(photo);
    photosByAlbum.set(photo.data.album, list);
  }
  for (const list of photosByAlbum.values()) {
    list.sort(comparePhotos);
  }

  const sortedAlbums = [...albums].sort((a, b) => {
    const ad = sortTimestamp(a, photosByAlbum.get(a.id) ?? []);
    const bd = sortTimestamp(b, photosByAlbum.get(b.id) ?? []);
    if (ad == null && bd == null) return a.data.title.localeCompare(b.data.title);
    if (ad == null) return 1;
    if (bd == null) return -1;
    if (ad !== bd) return bd - ad;
    return a.data.title.localeCompare(b.data.title);
  });

  return { albums: sortedAlbums, photosByAlbum };
}

/** Album for a camp page: explicit `camp` field, or the same id as the camp. */
export function albumForCamp(campId: string, albums: Album[]) {
  return albums.find((album) => (album.data.camp ?? album.id) === campId);
}
