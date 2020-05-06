import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Dialog } from '../dialog'
import { ExternalLinkIcon } from '../icons'
import { Paragraph } from '../typography'
import { Button } from '../buttons'

export const ExternalLink = styled.a.attrs(props => ({
    target: '_blank',
    rel: 'noopener noreferrer',
    href: props.to,
}))``

ExternalLink.propTypes = {
    to: PropTypes.string.isRequired,
}

const ExternalLinkWithConfirmation = styled.a.attrs(props => ({
    target: '_blank',
    rel: 'noopener noreferrer',
    href: props.to,
}))`
    cursor: pointer;
    & > svg {
        margin-left: 0.5rem;
    }

`

const ExternalLinkNoConfirmation= styled.a.attrs(props => ({
    target: '_blank',
    rel: 'noopener noreferrer',
    href: props.to,
}))`
    cursor: pointer;
`

export const OutsideLink = ({ to, asButton, noIcon = false, children, ...rest }) => {
    const [requiresConfirmation, setRequiresConfirmation] = useState(false)
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
    
    const handleClickLink = event => {
        event.preventDefault()
        setConfirmationDialogOpen(true)
    }

    const handleClickCancel = event => {
        // event.preventDefault()
        setConfirmationDialogOpen(false)
    }

    const handleClickContinue = event => {
        setConfirmationDialogOpen(false)
        window.open(to, '_blank')
    }

    useEffect(() => {
        const hostRegexPattern = new RegExp(/^https?:\/\/.+\.([a-z]{2,3})\//)
        const match = hostRegexPattern.exec(to)
        if (match) {
            const tld = match[1]
            setRequiresConfirmation(tld !== 'gov')
        }
    }, [to])

    return requiresConfirmation
        ? <Fragment>
            <ExternalLinkWithConfirmation as={ asButton ? Button : null } { ...rest } to={ to } onClick={ handleClickLink }>
                { children }{ !asButton && !noIcon && <ExternalLinkIcon fill="var(--color-eggplant)" size={ 14 } /> }
            </ExternalLinkWithConfirmation>
            {
                confirmationDialogOpen && <Dialog
                    onContinue={ handleClickContinue }
                    onCancel={ handleClickCancel }
                    title="Leaving BioData Catalyst"
                    content={
                        <Fragment>
                            <Paragraph>
                                The icon <ExternalLinkIcon size={ 16 } fill="var(--color-eggplant)" /> indicates a link that exits the NHLBI BioData Catalyst ecosystem.
                            </Paragraph>
                            <Paragraph>
                                NIH cannot attest to the accuracy of a non-federal site.
                                Linking to a non-federal site does not constitute an endorsement by NIH or any of its employees of the sponsors or the information and products presented on the site.
                                You will be subject to the destination's privacy policy when you follow the link.
                            </Paragraph>
                            <Paragraph>
                                Are you sure you want to navigate to <u>{ to }</u>?
                            </Paragraph>
                        </Fragment>
                    }
                />
            }
        </Fragment>
        : <ExternalLink to={ to }>{ children }</ExternalLink>
}
