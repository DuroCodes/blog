import React from 'react';

type Props = {
  embedId: string;
};

export default function YoutubeEmbed({ embedId }: Props) {
  return (
    <div className='overflow-hidden pb-[56.25%] relative h-0 mt-4 mb-4 border border-slate-300 dark:border-slate-700 rounded-xl'>
      <iframe
        className='h-full w-full absolute'
        width='853'
        height='480'
        src={`https://youtube.com/embed/${embedId}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='YouTube Video'
      />
    </div>
  );
}
