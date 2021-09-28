import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/sidebar.component.css';
import bookmarkIcon from '../../../assets/images/star.svg';
import settingIcon from '../../../assets/images/setting-icon.svg';
import themeImageIcon from '../../../assets/images/theme_image-icon.svg';
import { useAppSelector } from '../configureStore';
import { IVisitHistory } from '../../types/browsing';
import HistoryFavicon from './HistoryFavicon';

const Sidebar: React.FC = () => {
  const [showHistory, setShowHistory] = useState<IVisitHistory[]>([]);
  const { history } = useAppSelector((state) => state.data);

  useEffect(() => {
    if (history) {
      setShowHistory([...history].reverse().slice(0, 3));
    }
  }, [history]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.latest_data_wrapper}>
        {showHistory.length && (
          <>
            {showHistory[0] && (
              <HistoryFavicon
                key={showHistory[0].id}
                url={showHistory[0].url}
              />
            )}
            {showHistory[1] && (
              <HistoryFavicon
                key={showHistory[1].id}
                url={showHistory[1].url}
              />
            )}
            {showHistory[2] && (
              <HistoryFavicon
                key={showHistory[2].id}
                url={showHistory[2].url}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.menu_button_wrapper}>
        <Link to="/">
          <img
            src={bookmarkIcon}
            className={styles.menu_image}
            alt="bookmark"
          />
        </Link>
        <Link to="/">
          <img
            src={themeImageIcon}
            className={styles.menu_image}
            alt="background"
          />
        </Link>
        <Link to="/">
          <img src={settingIcon} className={styles.menu_image} alt="setting" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
