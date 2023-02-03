import React from 'react'

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export const SpinerLoading = () => {
    return (
        <>

            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </>
    );
}