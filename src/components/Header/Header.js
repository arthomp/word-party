import React from 'react';
import "./Header.scss";
import Rainbowfy from 'react-rainbowfy';

const Header = ({word}) => {
    const weight = '100';

    return (
        <div className="header">
            <Rainbowfy fontWeight={weight}>{word ? word : "Word Party"}</Rainbowfy>
        </div>
    );
};

export default React.memo(Header);