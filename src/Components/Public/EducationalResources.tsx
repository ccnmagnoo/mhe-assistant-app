import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Expo } from './Educational/Expo';
import { Videos } from './Educational/Videos';
import { Mobile } from './Educational/Mobile';
import './Educational/Educational.css';

export const EducationalResources = () => {
  return (
    <>
      <header>
        <Typography variant='h5' color='primary'>
          Explora & aprende
        </Typography>

        <Typography variant='body1' color='textPrimary'>
          Porque cada día se puede aprender algo más
        </Typography>
      </header>
      <main>
        <section>
          <Expo />
        </section>
        <section>
          <Videos></Videos>
        </section>
        <section>
          <Mobile />
        </section>
      </main>
    </>
  );
};
