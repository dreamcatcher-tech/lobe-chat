'use client';

import { FluentEmoji } from '@lobehub/ui';
import { Center, Flexbox } from 'react-layout-kit';
import { memo } from 'react';

const ComingSoon = memo(() => (
  <Center height={'100%'} width={'100%'}>
    <Flexbox align={'center'} gap={12}>
      <FluentEmoji emoji={'🚧'} size={64} />
      <h2>Coming Soon!</h2>
    </Flexbox>
  </Center>
));

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
