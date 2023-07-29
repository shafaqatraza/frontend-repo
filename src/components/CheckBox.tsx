import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import trash from "../assets/imgs/trash.png";
import PLUS from "../assets/imgs/plus.png";
import cros from "../assets/imgs/cros.png";
import { Image, Input } from "@chakra-ui/react";

interface Option {
  label: string;
  value: string;
}

interface FormData {
  question_type_id: number;
  question: string;
  options: string[];
  is_required: number;
}

const CheckBox = (props: any) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [isRequired, setIsRequired] = useState(false);

  const handleAddOption = () => {
    setOptions([
      ...options,
      { label: `Option ${options.length + 1}`, value: "" },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((option, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = {
      question_type_id: 2,
      question,
      options: options.map((option) => option.value),
      is_required: isRequired ? 1 : 0,
    };
    console.log(formData);
    props.onChildCheckbox(JSON.stringify(formData));
  };
  const sendDataCheckbox = () => {
    // props.onChildData(JSON.stringify(FormData));
    console.log(JSON.stringify(FormData), "ansss");
  };

  return (
    <Row>
      <Col md={6}>
        <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
          <Input
            id="question"
            type="text"
            value={question}
            style={{ backgroundColor: "#E8E8E8" }}
            className="form-control mt-2"
            placeholder="Question"
            onChange={(event) => setQuestion(event.target.value)}
            required
          />

          {options.map((option, index) => (
            <div key={index}>
              <div className="d-flex align-items-center mt-3">
                {/* <label htmlFor={`option-${index}`}>{option.label}:</label> */}
                <input
                  className="mt-2"
                  style={{ height: "18px", width: "18px" }}
                  type="checkbox"
                />
                <input
                  id={`option-${index}`}
                  type="text"
                  value={option.value}
                  style={{ width: "80%" }}
                  className="border-bottom-input ms-3 mt-1"
                  placeholder="Option 1"
                  onChange={(event) =>
                    handleOptionChange(index, event.target.value)
                  }
                  required
                />
                <Image
                  className="ms-2 mt-2"
                  src={cros.src}
                  onClick={() => handleRemoveOption(index)}
                />
              </div>
            </div>
          ))}

          <div className="mt-2 mb-2">
            <Image src={PLUS.src} onClick={handleAddOption} />
          </div>

          <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-1"
              id="is_required"
              type="checkbox"
              checked={isRequired}
              onChange={(event) => setIsRequired(event.target.checked)}
               // @ts-ignore: Unreachable code error
              onBlur={handleFormSubmit}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1">
              <Image src={trash.src} />
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CheckBox;
