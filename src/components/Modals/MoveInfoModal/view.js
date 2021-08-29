import React from 'react';

import MoveButton from 'components/Common/MoveButton';
import CopyModal from 'components/Modals/CopyModal';

import MailIcon from 'assets/svg/mail.svg';
import LinkIcon from 'assets/svg/link.svg';
import ClockIcon from 'assets/svg/clock.svg';

import styles from './styles.scss';

const getFormattedPhone = (phone) => {
  const phoneNumber = phone.replace(/\D+/g, '');
  const phoneRegex = /^([0-9]{1})?([0-9]{3})?([0-9]{3})?([0-9]{2})?([0-9]{2})$/;
  const formattedPhone = phoneNumber.replace(phoneRegex, '+$1 ($2) $3-$4-$5');

  return formattedPhone;
};

const getAdditionalBlocks = (additional) => {
  if (!additional) {
    return null;
  }

  const { phone, responsible, workingHours } = additional;

  return (
    <>
      {phone && (
        <span className={styles.phone}>
          Телефон:&nbsp;
          {getFormattedPhone(phone)}
        </span>
      )}
      {responsible && (
        <span className={styles.responsible}>
          Ответственный:&nbsp;
          {responsible}
        </span>
      )}
      {workingHours && (
        <span className={styles.workingHours}>
          Часы работы:&nbsp;
          {workingHours}
        </span>
      )}
    </>
  );
};

const getInfoButtons = (additional, setIsTextCopied) => {
  if (!additional) {
    return null;
  }
  const { email, website, timetable } = additional;

  return (
    <div className={styles.additionalButtons}>
      {email && (
        <button
          title="Скопировать"
          onClick={() => {
            navigator.clipboard.writeText(email);
            setIsTextCopied(true);
          }}
          className={styles.mailButton}
        >
          <MailIcon className={styles.mailIcon} />
        </button>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className={styles.website}
          title="Скопировать"
        >
          <LinkIcon className={styles.websiteIcon} />
        </a>
      )}
      {timetable && (
        <a
          href={timetable}
          target="_blank"
          rel="noreferrer"
          className={styles.website}
          title="Скопировать"
        >
          <ClockIcon className={styles.websiteIcon} />
        </a>
      )}
    </div>
  );
};

const View = ({
  element,
  setActiveMapName,
  setActiveElement,
  isTextCopied,
  setIsTextCopied,
  isInfoOnly,
  windowWidth,
}) => {
  const { name, disc, direction, additional } = element;

  const additionalBlocks = getAdditionalBlocks(additional);
  const infoButtons = getInfoButtons(additional, setIsTextCopied);

  return (
    <div className={styles.container} title={`Перейти в ${name}`}>
      <span className={styles.title}>{name}</span>
      <div className={styles.discBlock}>
        <span className={styles.disc}>{disc}</span>
        {additionalBlocks}
      </div>

      {!isInfoOnly && (
        <MoveButton
          className={styles.enterIcon}
          onClick={() => {
            setActiveMapName(direction);
            setActiveElement(null);
          }}
        />
      )}
      {infoButtons}
      <CopyModal
        isTextCopied={isTextCopied}
        message="Почта скопирована"
        isMob={windowWidth < 1000}
      />
    </div>
  );
};

export default View;
