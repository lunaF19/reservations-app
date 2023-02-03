import { useEffect } from "react"

import { Slider } from "@mui/material";

import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import Select from "react-select"

export const FilterSerch = ({
    rangeOfPrice,
    formValues,
    filterIsNumber,
  
    placeholderByFilter,
    typesOfFilters,
    listOfFilters,
  
    hadleOnSubmitFormValues,
    handleInputChangeFormValues,
    //setIndicatorPetition,
    // setPetition
  }) => {
  
    const {
      number1,
      number2,
      typeFilter
    } = formValues
  
  
    useEffect(() => {
    }, [])
  
    return (
      <Form className="" onSubmit={hadleOnSubmitFormValues}>
  
        <Row>
  
          {
            filterIsNumber ? (
              <PriceRage
                minPrice={rangeOfPrice[0]}
                maxPrice={rangeOfPrice[1]}
                number1={number1}
                number2={number2}
                handleInputChange={handleInputChangeFormValues}
              />
            ) : (
              <FormGroup tag={Col} md={"2"}>
                <Label for="search">Search</Label>
                <Input
                  type={typeFilter}
                  name={formValues.typeFilter}
                  id="serchSuit"
                  value={formValues[formValues.typeFilter]}
                  placeholder={placeholderByFilter[formValues.typeFilter]}
                  onChange={handleInputChangeFormValues}
                />
  
              </FormGroup>
            )
          }
  
          <FormGroup tag={Col} md="2">
            <Label for="typeFilter">FilterBy</Label>
            <Select
              id="typeFilter"
              name="typeFilter"
              options={listOfFilters}
              value={listOfFilters.find(item => item.value === typeFilter)}
              onChange={
                (item) => handleInputChangeFormValues({ target: { name: "typeFilter", value: item.value } })
              }
            />
          </FormGroup>
  
        </Row>
  
      </Form>
    )
  }
  
  
  const PriceRage = ({
    number1,
    number2,
    maxPrice,
    minPrice,
    handleInputChange
  }) => {
  
    //  const [valuesRage, setValuesRage] = useState([1, 500]);
  
    const handleChange1 = (
      event,
      newValue,
      activeThumb
    ) => {
      if (!Array.isArray(newValue)) return;
  
      if (activeThumb === 0) {
        const numberRange1 = Math.min(newValue[0], number2 - 5)
        handleInputChange({ target: { name: "number1", value: numberRange1 } })
        //setValuesRage([numberRange1, valuesRage[1] ]);
      } else {
        const numberRange2 = Math.max(newValue[1], number1 + 5)
        handleInputChange({ target: { name: "number2", value: numberRange2 } })
        //setValuesRage([valuesRage[0], numberRange2 ]);
      }
    };
  
    return (
      <>
        {/* {
        JSON.stringify({number1,
          number2,
          minPrice,
          maxPrice,
        })
      } */}
        <FormGroup tag={Col} md={"2"}>
          <Label className="font-weight-bold">Range of price: [${number1} - ${number2}] </Label>
          <Slider
            min={minPrice}
            max={maxPrice}
            color="primary"
            getAriaLabel={() => 'Minimum distance'}
            getAriaValueText={value => `$${value}`}
            valueLabelFormat={value => `$${value}`}
            value={[number1, number2]}
            onChange={handleChange1}
            valueLabelDisplay="auto"
  
            disableSwap
          />
        </FormGroup>
  
  
        {/*       
        <FormGroup tag={Col} md={"1"}>
          <Label for="number">From</Label>
          <Input
            type={"number"}
            min="0"
            max={number2}
            name={"number1"}
            id="filter_number1"
            value={number1}
            placeholder={""}
            onChange={handleInputChange}
          />
  
        </FormGroup>
        <FormGroup tag={Col} md={"1"}>
          <Label for="search">Until</Label>
          <Input
            min={parseInt(number1)}
            type={"number"}
            name={"number2"}
            id="filter_number2"
            value={number2}
            placeholder={""}
            onChange={handleInputChange}
          />
  
        </FormGroup> */}
      </>
    )
  }