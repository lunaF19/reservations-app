import './styleLoadTableData.css'

export const LoadingTableData = ({

}) => {
    return (
        <div className='container loader'> 

            <div className='load principal'>
                <span>Loadding</span>
            </div>
            
            <div className="load line first"></div>

            <div className="load line second"></div>

            <div className="load line third"></div>
        </div>
    )
}