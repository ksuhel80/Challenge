import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Select from "./Select";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast from "react-hot-toast";

function App() {
  const [user, setUser] = useState([]);
  const [id, setID] = useState(1);
  const [name, setName] = useState("");
  const [sector, setSector] = useState([]);
  const [terms, setTerms] = useState(false);
  const [input, setInput] = useState(false);
  var nodes = [];

  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    fetch("https://challenge-blue-three.vercel.app/sectors")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataa(data);
        // setSector([...sector, "Manufacturing"]);
      });
  }, []);

  useEffect(() => {
    fetch("https://challenge-blue-three.vercel.app/users")
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        setID(json[0]._id);
        setName(json[0].name);
        setSector(json[0].sectors);
        setTerms(json[0].terms);
      });
  }, []);

  const handleChange = (item) => {
    const filter = sector.filter((el) => el === item);

    if (filter.length > 0) {
      const filter1 = sector.filter((el) => el !== item);

      setSector(filter1);
    } else {
      setSector([...sector, item]);
    }
  };

  const save = () => {
    if (name != "" && sector.length != 0 && terms == true) {
      console.log(name, sector, id, terms);
      fetch("https://challenge-blue-three.vercel.app/users", {
        method: "POST",
        body: JSON.stringify([
          {
            _id: id,
            name: name,
            sectors: sector,
            terms: terms,
          },
        ]),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          response.json();
          alert("Updated successfully");
        })
        .then((json) => console.log(json));
    }
  };
  console.log(sector);
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h2>
        <label> Name </label> &nbsp;
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="input"
        />
        <br /> <br />
        <div className="layer2">
          <label>Sectors</label>
          <button
            onClick={() => {
              setInput(!input);
            }}
            className="buttons"
          >
            Click to add Sectors &nbsp;{" "}
            {!input ? <FiChevronDown /> : <FiChevronUp />}
          </button>
        </div>
        {input && (
          <div className="layer1 div">
            {dataa.map((item) => {
              const filter = sector.filter((el) => el === item.label);

              return (
                <div>
                  <div
                    onClick={() => {
                      handleChange(item.label);
                    }}
                  >
                    {" "}
                    {item.children.length === 0 && (
                      <input
                        type="checkbox"
                        value={item.label}
                        checked={filter.length > 0 ? true : false}
                      />
                    )}
                    <label>{item.label} </label>
                  </div>{" "}
                  {item.children.length > 0 && (
                    <div className="layer1">
                      {item.children.map((item1) => {
                        const filter1 = sector.filter(
                          (el) => el === item1.label
                        );

                        return (
                          <div>
                            <div
                              onClick={() => {
                                handleChange(item1.label);
                              }}
                            >
                              {" "}
                              {item1.children.length === 0 && (
                                <input
                                  type="checkbox"
                                  value={item1.label}
                                  checked={filter1.length > 0 ? true : false}
                                />
                              )}
                              <label>{item1.label} </label>
                            </div>

                            {item1.children.length > 0 && (
                              <div className="layer1">
                                {item1.children.map((item2) => {
                                  const filter2 = sector.filter(
                                    (el) => el === item2.label
                                  );
                                  return (
                                    <div>
                                      <div
                                        onClick={() => {
                                          handleChange(item2.label);
                                        }}
                                      >
                                        {item2.children.length === 0 && (
                                          <input
                                            type="checkbox"
                                            value={item2.label}
                                            checked={
                                              filter2.length > 0 ? true : false
                                            }
                                          />
                                        )}
                                        <label>{item2.label} </label>
                                      </div>

                                      {item2.children.length > 0 && (
                                        <div className="layer1">
                                          {item2.children.map((item3) => {
                                            const filter3 = sector.filter(
                                              (el) => el === item3.label
                                            );

                                            return (
                                              <div
                                                onClick={() => {
                                                  handleChange(item3.label);
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  value={item3.label}
                                                  checked={
                                                    filter3.length > 0
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                <label>{item3.label} </label>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <br />
        <input
          type="checkbox"
          value={terms}
          onChange={() => {
            setTerms(!terms);
          }}
          checked={terms}
        />
        <label> Agree to terms </label>
        <br />
        <br />
        <button
          onClick={() => {
            save();
          }}
          className="save"
        >
          {" "}
          save
        </button>
      </header>
    </div>
  );
}

export default App;
