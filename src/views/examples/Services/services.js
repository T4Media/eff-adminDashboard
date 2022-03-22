import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Modal,
  Col,
  FormGroup,
  Input,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { get, post, _delete } from "../../../request/request";
import Header from "components/Headers/Header.js";
import "../../index.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      banners: null,
      viewCategoryDetails: {},
      searchVal: "",
      image: null,
      imageToSend: null,
      makeChange: false,
      video: null,
      code: null,
      value: 0,
      editorState: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  fetchData() {
    get("banner/")
      .then(({ data }) => {
        if (data) {
          this.setState({ banners: data[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  toggle = (v) =>
    this.setState({
      modal: !this.state.modal,
      viewCategoryDetails: v,
      imageToSend: null,
      code: v.code,
      image: null,
    });

  deleteCategory(e) {
    _delete(e._id, "subCategories/delete").then(({ data }) => {
      this.setState({
        banners: this.state.banners.filter((x) => e._id !== x._id),
      });
      this.toggle({ subcategories: [] });
    });
  }

  TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  searchHandler(e) {
    this.setState({ searchVal: e.target.value });
    if (e.target.value == "") {
      this.fetchData();
    } else {
      post({ text: e.target.value }, "category/search")
        .then(({ data }) => {
          if (data) {
            this.setState({ banners: data.categories });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png"
      ) {
        this.setState({
          image: URL.createObjectURL(e.target.files[0]),
          imageToSend: e.target.files[0],
          makeChange: true,
        });
      } else if (e.target.files[0].type === "video/mp4") {
        this.setState({
          video: URL.createObjectURL(e.target.files[0]),
          imageToSend: e.target.files[0],
        });
      }
    }
  };

  handleChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ value: newValue });
  };

  deleteBanner = () => {
    console.log(this.state.banners);
    if (this.state.code === "img1") {
      _delete({}, "banner/delete_image_1")
        .then((res) => {
          const banners = this.state.banners;
          banners.image_1 = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.state.code === "img2") {
      _delete({}, "banner/delete_image_2")
        .then((res) => {
          const banners = this.state.banners;
          banners.image_2 = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.code === "img3") {
      _delete({}, "banner/delete_image_3")
        .then((res) => {
          const banners = this.state.banners;
          banners.image_3 = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.code === "vid") {
      _delete({}, "banner/deleteVideo")
        .then((res) => {
          const banners = this.state.banners;
          banners.video = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  saveChanges = () => {
    if (this.state.imageToSend !== null) {
      let formData = new FormData();

      if (this.state.code === "img1") {
        formData.append("image_1", this.state.imageToSend);
        post(formData, "banner/add_image_1")
          .then((res) => {
            console.log(res);
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.state.code === "img2") {
        formData.append("image_2", this.state.imageToSend);
        post(formData, "banner/add_image_2")
          .then((res) => {
            console.log(res);
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.state.code === "img3") {
        formData.append("image_3", this.state.imageToSend);
        post(formData, "banner/add_image_3")
          .then((res) => {
            console.log(res);
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.state.code === "vid") {
        formData.append("video", this.state.imageToSend);
        post(formData, "banner/addVideo")
          .then((res) => {
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="modal-container"
          >
            <ModalHeader>Add New Service</ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <h5>Service Name</h5>
                    <Input
                      onChange={this.searchHandler.bind(this)}
                      name="service_name"
                      value={this.state.service_name}
                      id="input-address"
                      placeholder="Service_Name"
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col xs="12">
                  <FormGroup>
                    <h5>Service Description</h5>
                    <Editor
                      style={{ border: "5px solid" }}
                      editorState={this.state.editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange}
                    />
                    ;
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
          </Modal>

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1>Sierra Textiles Services</h1>
                    <Button color="info" size="md" type="button">
                      Add New Service
                    </Button>
                  </div>
                  <Box sx={{ width: "100%" }} className="mt-4">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                      >
                        <Tab
                          style={{ maxWidth: "25%", fontSize: 12 }}
                          label="SOURCING AND PRODUCT DEVELOPMENT"
                          {...this.a11yProps(0)}
                        />
                        <Tab
                          style={{ maxWidth: "25%", fontSize: 12 }}
                          label="PRODUCTION AND QUALITY CONTROL"
                          {...this.a11yProps(1)}
                        />
                        <Tab
                          style={{ maxWidth: "25%", fontSize: 12 }}
                          label="TEXTILE AND DESIGN SERVICES"
                          {...this.a11yProps(2)}
                        />
                        <Tab
                          style={{ maxWidth: "25%", fontSize: 12 }}
                          label="DIGITAL MERCHANDISING SERVICE"
                          {...this.a11yProps(3)}
                        />
                        <Tab
                          style={{ maxWidth: "25%", fontSize: 12 }}
                          label="DIGITAL = SERVICE"
                          {...this.a11yProps(4)}
                        />
                      </Tabs>
                      <this.TabPanel value={this.state.value} index={0}>
                        1
                      </this.TabPanel>
                      <this.TabPanel value={this.state.value} index={1}>
                        2
                      </this.TabPanel>
                      <this.TabPanel value={this.state.value} index={2}>
                        3
                      </this.TabPanel>
                      <this.TabPanel value={this.state.value} index={2}>
                        4
                      </this.TabPanel>
                    </Box>
                  </Box>
                </CardHeader>
              </Card>
              <br />
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
