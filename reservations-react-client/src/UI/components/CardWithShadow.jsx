import { Col } from "reactstrap"

export const CardWithShadow = ({ md = 4, children, className=""}) => {

    if (md > 12) md = 12
    if (md < 1) md = 1

    return (
        <Col md={md} className={`shadow-lg bg-body rounded ${className}  `}>
            {children}
        </Col>
    )

}