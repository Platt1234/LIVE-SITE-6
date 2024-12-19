import React from 'react';

interface PodcastEmbedProps {
  episodeId: string;
}

export function PodcastEmbed({ episodeId }: PodcastEmbedProps) {
  return (
    <iframe 
      style={{ borderRadius: '12px' }}
      src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`}
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify podcast episode"
    />
  );
}