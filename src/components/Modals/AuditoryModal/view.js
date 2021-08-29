import React from 'react';

import ClockIcon from 'assets/svg/clock.svg';
import MailIcon from 'assets/svg/mail.svg';
import LinkIcon from 'assets/svg/link.svg';

import styles from './styles.scss';

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

const View = ({ element }) => {
  const { name, disc, timetable } = element;

  return (
    <div className={styles.container} title={`Перейти в ${name}`}>
      <span className={styles.title}>{name}</span>
      <span className={styles.disc}>{disc}</span>
      {timetable && (
        <a
          href={timetable}
          target="_blank"
          rel="noreferrer"
          className={styles.timeTableLink}
          title="Скопировать"
        >
          <ClockIcon className={styles.clockIcon} />
        </a>
      )}
    </div>
  );
};

export default View;
