import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading } from '../typography'
import { CloseIcon } from '../icons'

const CloseButton = styled.button`
    position: absolute;
    top: 50%;
    right: 0;
    border: 0;
    cursor: pointer;
    padding: 0;
    height: 100%;
    width: 3rem;
    background-color: transparent;
    transform: translateY(-50%);
    transition: opacity 250ms, filter 250ms;
    filter: saturate(0.5);
    &:hover {
        filter: saturate(1.0);
    }
`

const Wrapper = styled.div`
    position: relative;
    background-color: var(--color-gold);
    padding: 0.25rem 2rem;
    margin: 0;
    display: ${ props => props.visible ? 'block' : 'none' };
    & ${ CloseButton } {
        opacity: 0.25;
    }
    &:hover ${ CloseButton } {
        opacity: 1.0;
    }
`

export const Notice = ({ mutable, children }) => {
    const [visible, setVisible] = useState(true)

    return (
        <Wrapper visible={ visible }>
            { mutable && <CloseButton onClick={ () => setVisible(false) }><CloseIcon fill="var(--color-crimson)" size={ 24 } /></CloseButton> }
            { children }
        </Wrapper>
    )
}