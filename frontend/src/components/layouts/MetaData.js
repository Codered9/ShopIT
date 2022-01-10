import { Helmet} from 'react-helmet'
import React from 'react'

const MetaData = ({title}) => {
    return (
        <div>
            <Helmet>
                <title>{`${title} - ShopIT`}</title>
            </Helmet>
        </div>
    )
}

export default MetaData
