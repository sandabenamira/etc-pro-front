import React from 'react';
import moment from 'moment';

const LanguageItem = ({ language, switchLanguage, handleRequestClose }) => {
  const { icon, name } = language;
  return (
    <li className="pointer" onClick={() => {
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
