import { useNode } from "@craftjs/core";
import { Label } from "../ui/form/Label";
import { TextInput } from "../ui/form/TextInput";
import { FieldArray, Form, Formik } from "formik";
import { Button as MaterialButton, Paper } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useState } from "react";

const bannerArray = [];

export const ScrollingLogoDefaultProps = {
  slidesToShow: 1,
  showArrows: false,
  bannerArr: bannerArray,
};

export const ScrollingLogoSettings = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [addOrEdit, setAddorEdit] = useState(false); // controls if we are adding or editing a slide

  const {
    actions: { setProp },
    slidesToShow,
    bannerArr,
    showArrows,
  } = useNode((node) => ({
    slidesToShow: node.data.props.slidesToShow,
    bannerArr: node.data.props.bannerArr,
    showArrows: node.data.props.showArrows,
  }));

  const initialValues = {
    slides: bannerArr,
  };

  const submitForm = async (values) => {
    setAddorEdit(false);
    setEditIndex(null); // Reset edit state after submission
    setProp((props) => (props.bannerArr = values.slides));
  };

  return (
    <>
      <Label label="slideToShow">
        <TextInput
          type="number"
          defaultValue={slidesToShow}
          min="1"
          onChange={(e) => {
            setProp((props) => (props.slidesToShow = e.target.value), 1000);
          }}
        />
      </Label>

      <Label
        label={"Show Arrows"}
        className="block mb-2 text-sm font-medium text-gray-900 ltr:mr-2 rtl:ml-2"
      >
        <TextInput
          checked={showArrows}
          onChange={(e) =>
            setProp((props) => (props.showArrows = e.target.checked))
          }
          type="checkbox"
          value=""
          className="peer sr-only"
        />
        <div className="after:start-[2px] mt-2 peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </Label>

      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="w-full">
              <FieldArray name="slides">
                {({ remove, push }) => (
                  <div>
                    {!addOrEdit && values.slides.length > 0 && (
                      <div>
                        <div className="mb-2 mt-2 text-lg font-semibold">
                          All Slides
                        </div>
                        {values.slides.map((banner, index) => {
                          return (
                            <Paper
                              key={index}
                              className="p-4 mb-4 rounded-md border border-gray-300 relative"
                            >
                              <div>Slide - {index + 1}</div>
                              <Delete
                                className="absolute right-10 top-2 cursor-pointer text-red-500"
                                onClick={() => {
                                  const data = remove(index);
                                  setProp(
                                    (props) =>
                                      (props.bannerArr = values.slides.filter(
                                        (slide) => slide.image !== data.image
                                      ))
                                  );
                                }}
                              />
                              <Edit
                                className="absolute right-2 top-2 cursor-pointer text-blue-500"
                                onClick={() => {
                                  setAddorEdit(true);
                                  setEditIndex(index);
                                }}
                              />
                            </Paper>
                          );
                        })}
                      </div>
                    )}
                    <div>
                      {/* Show the form when adding or editing */}
                      {(addOrEdit || editIndex !== null) && (
                        <div className="mt-4 rounded-md border-2 border-gray-900 p-8 relative">
                          <div className="mt-4 flex items-center flex-col">
                            <label
                              htmlFor="reciever-email"
                              className="self-start font-bold mb-0 w-1/2 ltr:mr-2 rtl:ml-2"
                            >
                              Image URL
                            </label>
                            <TextInput
                              name={`slides[${
                                editIndex !== null
                                  ? editIndex
                                  : values.slides.length - 1
                              }].image`}
                              value={
                                values.slides[
                                  editIndex !== null
                                    ? editIndex
                                    : values.slides.length - 1
                                ].image
                              }
                              onChange={handleChange}
                              placeholder="Image URL"
                              type="text"
                              className=""
                            />
                          </div>
                          <div className="mt-4 flex items-center flex-col">
                            <label
                              htmlFor="reciever-email"
                              className="self-start font-bold mb-0 w-1/2 ltr:mr-2 rtl:ml-2"
                            >
                              Slide Title
                            </label>
                            <TextInput
                              name={`slides[${
                                editIndex !== null
                                  ? editIndex
                                  : values.slides.length - 1
                              }].title`}
                              value={
                                values.slides[
                                  editIndex !== null
                                    ? editIndex
                                    : values.slides.length - 1
                                ].title
                              }
                              onChange={handleChange}
                              placeholder="Slide Title"
                              type="text"
                              className=""
                            />
                          </div>
                          <div className="mt-4 flex items-center flex-col">
                            <label
                              htmlFor="reciever-email"
                              className="self-start font-bold mb-0 w-1/2 ltr:mr-2 rtl:ml-2"
                            >
                              Slide Description
                            </label>
                            <TextInput
                              name={`slides[${
                                editIndex !== null
                                  ? editIndex
                                  : values.slides.length - 1
                              }].description`}
                              value={
                                values.slides[
                                  editIndex !== null
                                    ? editIndex
                                    : values.slides.length - 1
                                ].description
                              }
                              onChange={handleChange}
                              placeholder="Slide Description"
                              type="text"
                              className=""
                            />
                          </div>
                          <div className="mt-4 flex items-center flex-col">
                            <label
                              htmlFor="reciever-email"
                              className="self-start font-bold mb-0 w-1/2 ltr:mr-2 rtl:ml-2"
                            >
                              Slide Button Text
                            </label>
                            <TextInput
                              name={`slides[${
                                editIndex !== null
                                  ? editIndex
                                  : values.slides.length - 1
                              }].buttonText`}
                              value={
                                values.slides[
                                  editIndex !== null
                                    ? editIndex
                                    : values.slides.length - 1
                                ].buttonText
                              }
                              onChange={handleChange}
                              placeholder="Slide Button Text"
                              type="text"
                              className=""
                            />
                          </div>

                          <Delete
                            className="absolute right-2 top-2 flex hover:text-danger cursor-pointer"
                            onClick={() => {
                              remove(
                                editIndex !== null
                                  ? editIndex
                                  : values.slides.length - 1
                              );
                            }}
                          />
                        </div>
                      )}

                      {/* Button to add new slide */}
                      {!addOrEdit && editIndex === null && (
                        <div className="mt-4 flex items-center">
                          <MaterialButton
                            fullWidth
                            variant="contained"
                            color="default"
                            onClick={() => {
                              setAddorEdit(true);
                              push({ image: "" });
                            }}
                          >
                            <Add /> Add New Slide
                          </MaterialButton>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </FieldArray>

              {(addOrEdit || editIndex !== null) && (
                <MaterialButton
                  style={{ marginTop: "20px" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="default"
                >
                  {editIndex !== null ? "Edit Slide" : "Add Slide"}
                </MaterialButton>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
