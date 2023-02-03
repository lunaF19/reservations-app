import React, { useState, useId } from "react";
import { Carousel } from "react-bootstrap";

export const CarruselImagesSuite = ({
    img = []
}) => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const id = useId()
    return (
        <Carousel
            className="p-2"
            activeIndex={index}
            onSelect={handleSelect}
        >
            {
                img.map((item, index) => {
                    return (
                        <Carousel.Item
                            key={`${id}${item.url}`}>
                            <img
                                style={{
                                    borderRadius: "1%",
                                    width: "600px",
                                    height: "550px",
                                    objectFit: "cover",
                                    }}
                                className="d-block w-100"
                                src={item.url}
                                alt={`${numString[index]} slide`}
                            />

                            <Carousel.Caption>
                                {item.title && <h3>{item.title}</h3>}
                                {item.info && <p>{item.info}</p>}
                            </Carousel.Caption>

                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )

}


const numString = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth', 'Twenty-First', 'Twenty-Second', 'Twenty-Third', 'Twenty-Fourth', 'Twenty-Fifth', 'Twenty-Sixth', 'Twenty-Seventh', 'Twenty-Eighth', 'Twenty-Ninth', 'Thirtieth', 'Thirty-First', 'Thirty-Second', 'Thirty-Third', 'Thirty-Fourth', 'Thirty-Fifth', 'Thirty-Sixth', 'Thirty-Seventh', 'Thirty-Eighth', 'Thirty-Ninth', 'Fortieth', 'Forty-First', 'Forty-Second', 'Forty-Third', 'Forty-Fourth', 'Forty-Fifth', 'Forty-Sixth', 'Forty-Seventh', 'Forty-Eighth', 'Forty-Ninth', 'Fiftieth']