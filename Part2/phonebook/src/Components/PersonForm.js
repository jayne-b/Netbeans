import React from 'react';

const PersonForm = ({onSubmit, valueName, onChangeName, valueNumber, onChangeNumber}) => {
    return (
        <form onSubmit={onSubmit}>
        <div>
          name:
          <input
            value={valueName}
            onChange={onChangeName}
          />
        </div>
        <div><p>number:
          <input
            value={valueNumber}
            onChange={onChangeNumber}
          /></p></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm