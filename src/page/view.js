import React from 'react';
import cn from 'classnames';

import Grid from 'components/Common/Grid';
import HomeButton from 'components/Common/HomeButton';
import PrevMapButton from 'components/Common/PrevMapButton';
import Map from 'modules/Map';
import Search from 'modules/Search';
import CorpusList from 'modules/CorpusList';

import styles from './styles.scss';

const View = ({ windowWidth }) => (
  <Grid className={styles.container}>
    <HomeButton />
    <PrevMapButton />
    <Grid
      direction="col"
      className={cn(styles.navContainer, windowWidth < 1000 ? styles.none : null)}
      id="corpusList"
    >
      <Search />
      <CorpusList />
    </Grid>
    <Map />
  </Grid>
);
export default View;
