import { ActionIcon, ActionIconProps } from '@lobehub/ui';
import {
  BotMessageSquare,
  Compass,
  FolderClosed,
  HeartCrack,
  MessagesSquare,
  Orbit,
  Palette,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';

const ICON_SIZE: ActionIconProps['size'] = {
  blockSize: 40,
  size: 24,
  strokeWidth: 2,
};

export interface TopActionProps {
  isPinned?: boolean | null;
  tab?: SidebarTabKey;
}

// chat can bring in the current context unless you hold alt
// add a play currency in there right now
// click on a button to bring in the current context with you, so no context
// drop

/**
 * Assistant Chats
 * Repos
 *
 * Discover (people, agents, napps)
 * Stucks
 * Value (ambient attribution, trading)
 *
 * Contacts ? connections ? installed or linked agents, people, and napps ?
 * Agentic chats
 */

const TopActions = memo<TopActionProps>(({ tab, isPinned }) => {
  const { t } = useTranslation('common');
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);
  const { showMarket, enableKnowledgeBase } = useServerConfigStore(featureFlagsSelectors);

  const isChatActive = tab === SidebarTabKey.Chat && !isPinned;
  const isFilesActive = tab === SidebarTabKey.Files;
  const isDiscoverActive = tab === SidebarTabKey.Discover;
  const isImageActive = tab === SidebarTabKey.Image;

  return (
    <Flexbox gap={8}>
      <Link
        aria-label={t('tab.chat')}
        href={'/chat'}
        onClick={(e) => {
          // If Cmd key is pressed, let the default link behavior happen (open in new tab)
          if (e.metaKey || e.ctrlKey) {
            return;
          }

          // Otherwise, prevent default and switch session within the current tab
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
        }}
      >
        <ActionIcon
          active={isChatActive}
          icon={BotMessageSquare}
          size={ICON_SIZE}
          title={'Assistant Chats'}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>

      <Link aria-label={t('tab.aiImage')} href={'/image'}>
        <ActionIcon
          active={isImageActive}
          icon={Palette}
          size={ICON_SIZE}
          title={t('tab.aiImage')}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>

      {enableKnowledgeBase && (
        <Link aria-label={t('tab.files')} href={'/files'}>
          <ActionIcon
            active={isFilesActive}
            icon={FolderClosed}
            size={ICON_SIZE}
            title={'Repos'}
            tooltipProps={{ placement: 'right' }}
          />
        </Link>
      )}
      {showMarket && (
        <Link aria-label={t('tab.discover')} href={'/discover'}>
          <ActionIcon
            active={isDiscoverActive}
            icon={Compass}
            size={ICON_SIZE}
            title={t('tab.discover')}
            tooltipProps={{ placement: 'right' }}
          />
        </Link>
      )}
      <Link aria-label={'Stucks'} href={'/image'}>
        <ActionIcon
          active={isImageActive}
          icon={HeartCrack}
          size={ICON_SIZE}
          title={'Stucks'}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>
      <Link aria-label={t('tab.aiImage')} href={'/image'}>
        <ActionIcon
          active={isImageActive}
          icon={Orbit}
          size={ICON_SIZE}
          title={'Economy'}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>

      <Link aria-label={t('tab.aiImage')} href={'/image'}>
        <ActionIcon
          active={isImageActive}
          icon={User}
          size={ICON_SIZE}
          title={'Contacts'}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>
      <Link aria-label={t('tab.aiImage')} href={'/image'}>
        <ActionIcon
          active={isImageActive}
          icon={MessagesSquare}
          size={ICON_SIZE}
          title={'Agentic Chats'}
          tooltipProps={{ placement: 'right' }}
        />
      </Link>
    </Flexbox>
  );
});

export default TopActions;
