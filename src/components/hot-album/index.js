import React, { memo } from "react";
import PropTypes from 'prop-types'

import { HotAlbumHeaderWrapper } from "./style";

const HotAblumHeader = memo(function (props) {
    const { title, keywords } = props;

    return (
        <HotAlbumHeaderWrapper>
            <div className="header">
                <h3 className="title">{title}</h3>
                <div className="keyword">
                    {keywords.map((item, index) => {
                        return (
                            <div className="item" key={item}>
                                <a href="todo">{item}</a>
                                <span className="divider">|</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </HotAlbumHeaderWrapper>
    );
});

HotAblumHeader.prototypes = {
    title: PropTypes.string.isRequired,
    keywords: PropTypes.array
}

HotAblumHeader.defaultProps={
    keywords:[]
}

export default HotAblumHeader;
