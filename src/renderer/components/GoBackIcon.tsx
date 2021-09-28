import React from 'react';
import classNames from 'classnames';
import styles from '../styles/go-icon.component.css';

type Props = {
  enabled: boolean;
};

const GoBackIcon = ({ enabled }: Props) => (
  <svg
    id="레이어_1"
    data-name="레이어 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10.73 10.06"
    className={classNames(
      styles.svg,
      enabled ? styles.enabled : styles.disabled
    )}
  >
    <g id="그룹_87" data-name="그룹 87">
      <g id="패스_38" data-name="패스 38">
        <path
          id="패스_141"
          data-name="패스 141"
          className={styles['cls-1']}
          d="M7.17,12.53l-5-5,5-5L8.25,3.55,4.3,7.5l4,3.95Z"
          transform="translate(-2.13 -2.47)"
        />
      </g>
      <g id="선_6" data-name="선 6">
        <rect
          id="사각형_217"
          data-name="사각형 217"
          className={styles['cls-1']}
          x="1.08"
          y="4.26"
          width="9.65"
          height="1.53"
        />
      </g>
    </g>
  </svg>
);

export default GoBackIcon;
