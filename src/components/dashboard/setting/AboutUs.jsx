import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddSiteSettingMutation } from "../../../redux/feature/setting/settingApi";
import { toast } from "react-toastify";

const AboutUs = ({ initialData, refetch }) => {
  const [delivery_condition, setDelivery_condition] = useState(initialData?.delivery_condition);
  const [aboutUs, setAboutUs] = useState(initialData?.about_us);
  const [return_policy, setreturn_policy] = useState(
    initialData?.return_policy
  );
  // const [contact_us, setContact_us] = useState(initialData?.contact_us);
  // const [shipping_info, setShipping_info] = useState(
  //   initialData?.shipping_info
  // );
  // const [material_care, setMaterial_care] = useState(
  //   initialData?.material_care
  // );
  const [terms_condition, setterms_condition] = useState(
    initialData?.terms_condition
  );
  const [privacy_policy, setprivacy_policy] = useState(
    initialData?.privacy_policy
  );
  const [cancellation_policy, setcancellation_policy] = useState(
    initialData?.cancellation_policy
  );
  const [refund_policy, setrefund_policy] = useState(
    initialData?.refund_policy
  );

  const [postSiteSettng] = useAddSiteSettingMutation();

  // about us post
  const handleDataPost = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      about_us: aboutUs,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // return and exchange post
  const handleDataPost2 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      return_policy: return_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // return and exchange post
  // const handleDataPost3 = async () => {
  //   toast.error("Please wait a moment");
  //   const sendData = {
  //     contact_us: contact_us,
  //     _id: initialData?._id,
  //   };
  //   postSiteSettng(sendData).then((result) => {
  //     if (result?.data?.statusCode == 200 && result?.data?.success == true) {
  //       toast.success(
  //         result?.data?.message
  //           ? result?.data?.message
  //           : "Site update successfully !",
  //         {
  //           autoClose: 1000,
  //         }
  //       );
  //       refetch();
  //     } else {
  //       toast.error(result?.error?.data?.message);
  //     }
  //   });
  // };

  // Shipping info post
  // const handleDataPost4 = async () => {
  //   toast.error("Please wait a moment");
  //   const sendData = {
  //     shipping_info: shipping_info,
  //     _id: initialData?._id,
  //   };
  //   postSiteSettng(sendData).then((result) => {
  //     if (result?.data?.statusCode == 200 && result?.data?.success == true) {
  //       toast.success(
  //         result?.data?.message
  //           ? result?.data?.message
  //           : "Site update successfully !",
  //         {
  //           autoClose: 1000,
  //         }
  //       );
  //       refetch();
  //     } else {
  //       toast.error(result?.error?.data?.message);
  //     }
  //   });
  // };

  // material_care post
  // const handleDataPost5 = async () => {
  //   toast.error("Please wait a moment");
  //   const sendData = {
  //     material_care: material_care,
  //     _id: initialData?._id,
  //   };
  //   postSiteSettng(sendData).then((result) => {
  //     if (result?.data?.statusCode == 200 && result?.data?.success == true) {
  //       toast.success(
  //         result?.data?.message
  //           ? result?.data?.message
  //           : "Site update successfully !",
  //         {
  //           autoClose: 1000,
  //         }
  //       );
  //       refetch();
  //     } else {
  //       toast.error(result?.error?.data?.message);
  //     }
  //   });
  // };


  // terms_condition post
  const handleDataPost6 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      terms_condition: terms_condition,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };


  // privacy_policy post
  const handleDataPost7 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      privacy_policy: privacy_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // refund_policy post
  const handleDataPost8 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      refund_policy: refund_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // cancellation_policy post
  const handleDataPost9 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      cancellation_policy: cancellation_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // delivery_condition post
  const handleDataPost10 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      delivery_condition: delivery_condition,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  return (
    <>
      {/* About us */}
      <ReactQuill theme="snow" value={aboutUs} onChange={setAboutUs} />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* delivery_condition */}
      <h4 className="font-semibold text-[20px] mt-2">Delivery Condition</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={delivery_condition}
        onChange={setDelivery_condition}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost10()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>


      {/* Return and exchange */}
      <h4 className="font-semibold text-[20px] mt-2">Return Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={return_policy}
        onChange={setreturn_policy}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost2()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      <h4 className="font-semibold text-[20px] mt-2">Refund Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={refund_policy}
        onChange={setrefund_policy}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost8()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      <h4 className="font-semibold text-[20px] mt-2">Cancellation Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={cancellation_policy}
        onChange={setcancellation_policy}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost9()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* privacy_policy Info */}
      <h4 className="font-semibold text-[20px] mt-2">Privacy And Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={privacy_policy}
        onChange={setprivacy_policy}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost7()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* Contact Us */}
      {/* <h4 className="font-semibold text-[20px] mt-2">Contact Us</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill theme="snow" value={contact_us} onChange={setContact_us} />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost3()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div> */}

      {/* Shipping Info */}
      {/* <h4 className="font-semibold text-[20px] mt-2">Shipping Info</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={shipping_info}
        onChange={setShipping_info}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost4()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div> */}

      {/* material_care Info */}
      {/* <h4 className="font-semibold text-[20px] mt-2">Material & Care Info</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={material_care}
        onChange={setMaterial_care}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost5()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div> */}

      {/* terms_condition Info */}
      <h4 className="font-semibold text-[20px] mt-2">Terms And Condition</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={terms_condition}
        onChange={setterms_condition}
      />
      <div
        className="mt-2 flex items-center justify-end"
      >
        <button
          onClick={() => handleDataPost6()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

    </>
  );
};

export default AboutUs;
