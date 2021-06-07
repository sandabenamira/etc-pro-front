import React from 'react';
import { getLanguage } from '../../store/actions/Countries';
import moment from 'moment';

const LanguageItem = ({ language, switchLanguage, handleRequestClose }) => {
  const { icon, name } = language;
  return (
    <li className="pointer" onClick={() => {
      getLanguage(language.locale)
      moment.locale(language.locale)
      handleRequestClose();
      switchLanguage(language);
    }}>
      <div className="d-flex align-items-center">
        <i className={`flag ${icon}`} />
        <h4 className="mb-0 ml-2">{name}</h4>
      </div>
    </li>
  );
};

export default LanguageItem;
