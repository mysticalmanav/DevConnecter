import React from "react";
import { div, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


import { useState } from "react";


const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const InputDefault = styled(TextField)({
  "& label.Mui-focused": {
    color: "#2F3C7E",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#8AAAE5", // Change this color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#317773", // Change this color
    },
    "&:hover fieldset": {
      borderColor: "#E2D1F9", // Change this color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ADD8E6", // Change this color
    },
  },
  "& input": {
    color: "#FFFFFF", // Change the text color
  },
  "& .MuiFormLabel-root": {
    color: "#FFFFFF", // Change the label text color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#FFFFFF", // Change the focused label text color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#FFFFFF", // Change the placeholder color
  },
});

const flexContainerStyle = {
  display: "flex",

  justifyContent: "center",
  flexWrap: "wrap", // Allow content to wrap to the next line
};

const responsiveColumn = {
  flexBasis: "100%", // Make each item take full width in a column
  padding: "5px", // Adjust spacing as needed
};

export default function Dashboard() {

  const [name, setName] = useState("");
  const [locationApproved, setLocation] = useState(false);
  const [gender, setgender] = useState("");
   
  const [mobNo, setMobNo] = useState("");
  const [Age, setAge] = useState("");
const onChangeLocation = (e) => {
    navigator.geolocation.getCurrentPosition(geoLocation,failedTOGet)
   
  };
  async function geoLocation(position) {
    console.log(position.coords.latitude, position.coords.longitude);
   setLocation(true);
    
}
function failedTOGet() {
    console.log("Access Denied");
   setLocation(false);

}
  
  
 
  
 
  
//   const submitHandler = async (e) => {
//     e.preventDefault();


//     const data = new FormData(e.currentTarget);
//       const resp = new FormData();

//       const response = {
//         name: data.get("name"),
//         image: url,
//         orderID: data.get("transId"),
//         admissionNumber: data.get("gender"),
//         mobileNumber: data.get("mobNo"),
//         Age: data.get("Age"),
//         tshirtSize: data.get("size"),
//         transactionID: data.get("transId"),
//         hostel: data.get("hostel"),
//         roomNumber: data.get("room"),
//         place: data.get("place"),
//       };
       
//       for(let prop in response){
//         resp.append(prop, response[prop]);
//       }

//     const formData = new FormData();
//     formData.append("image", url);
//     try {
//       const usr = await axios.post(
//         `${server}/purchase`,
//         resp,{
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(usr);
//     } catch (error) {
//       console.log("error2", error);
//     }
//   };
  const handleImageChange = (event) => {
     
  };

  return (
    <div >
      <div className="m-3" >
       
          <div className="text-light">
            <Typography variant="h5" className="mb-3" align="center">
              Enter Your Information
            </Typography>
            <Form
              style={{ width: "100%" }}
              className="m-3"
              
            >
              <div style={responsiveColumn}>
                <InputDefault
                  label="Name"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div style={responsiveColumn}>
                <InputDefault
                  label="Admission Number"
                  fullWidth
                  required
                  value={gender}
                  onChange={(e) => {
                    setgender(e.target.value);
                  }}
                />
              </div>
             
              <div style={responsiveColumn}>
                <InputDefault
                  label="Phone Number"
                  fullWidth
                  required
                  value={mobNo}
                  onChange={(e) => {
                    setMobNo(e.target.value);
                  }}
                />
              </div>
              <div style={responsiveColumn}>
                <InputDefault
                  label="Age"
                  fullWidth
                  required
                  value={Age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              {!locationApproved && (
          <div className="mb-3 bold-form">
            <input
             
              type="checkbox"
              name="locationApproved"
              className="form-check-input"
              checked={locationApproved}
              onChange={onChangeLocation}
            />
            <label htmlFor="locat" className="form-label bold-form">
              Use My Current Location
            </label>
          </div>
        )}

  
           
            
              <div style={responsiveColumn}>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={handleImageChange}
                    required
                    accept="image/*"
                  />
                  <Button className="m-3" variant="outlined" component="span">
                    Upload button
                  </Button>
                </label>
                <Button type="submit" className="m-3" variant="contained">
                  Place order
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    
  );
}