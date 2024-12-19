import React from 'react';
import { Container } from '../layout/Container';
import { PodcastEmbed } from './PodcastEmbed';

export function PodcastSection() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="mt-4 text-lg text-gray-600">
            Listen to Daniel discuss Platteneye's founding journey and our approach to M&A services
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <PodcastEmbed episodeId="2JAYVF18AdfhflCAkTEk3e" />
        </div>
      </Container>
    </section>
  );
}