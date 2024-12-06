import React, { useState } from "react";

const MyProfile = () => {
  // Initialize userData with default values (no localStorage)
  const [userData, setUserData] = useState({
    name: "",
    image: "/profileimages/female.jpg", // Default image
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });

  const [isEdit, setIsEdit] = useState(true); // Start with edit mode
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleImageSelect = (imagePath) => {
    setUserData((prev) => ({ ...prev, image: imagePath }));
    setShowImageOptions(false);
  };

  // Handle saving the data and showing the "Thank You" message
  const handleSave = () => {
    setIsEdit(false); // Disable editing
    setShowThankYou(true); // Show the "Thank You" message

    // Reset the form after saving (optional)
    setUserData((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
    }));
  };

  return (
    <div className="max-w-lg flex flex-col gap-6 p-6 bg-white dark:bg-gray-900 dark:text-white mx-auto mt-10 shadow-lg rounded-lg">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img
          className="w-36 h-36 mt-7 rounded-full border-4 border-gray-300 dark:border-gray-600 object-cover"
          src={userData.image}
          alt="Profile"
        />
        {isEdit && (
          <button
            className="bg-primary text-white px-4 py-2 mt-2 rounded"
            onClick={() => setShowImageOptions(true)}
          >
            Upload Profile Picture
          </button>
        )}
      </div>

      {/* Profile Picture Options */}
      {showImageOptions && (
        <div className="flex gap-4 mt-2 justify-center">
          <img
            className="w-20 h-20 cursor-pointer border rounded"
            src="/profileimages/male.jpg"
            alt="Male"
            onClick={() => handleImageSelect("/profileimages/male.jpg")}
          />
          <img
            className="w-20 h-20 cursor-pointer border rounded"
            src="/profileimages/female.jpg"
            alt="Female"
            onClick={() => handleImageSelect("/profileimages/female.jpg")}
          />
          <img
            className="w-20 h-20 cursor-pointer border rounded"
            src="/profileimages/lgbtq.jpg"
            alt="LGBTQ"
            onClick={() => handleImageSelect("/profileimages/lgbtq.jpg")}
          />
        </div>
      )}

      {/* User Details */}
      <div>
        {isEdit ? (
          <input
            className="bg-gray-50 dark:bg-gray-800 text-3xl font-medium w-full p-2 rounded mt-4"
            type="text"
            placeholder="Enter your name"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 dark:text-neutral-200 mt-4">
            {showThankYou ? "Thank you for your information!" : userData.name || "Your Name"}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none my-4" />
        <div>
          <p className="text-neutral-500 dark:text-neutral-400 underline mt-3">
            CONTACT INFORMATION
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 dark:text-neutral-300">
            <p className="font-medium">Email id:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 dark:bg-gray-800 max-w-52 p-1 rounded"
                type="text"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-500">{showThankYou ? "Thank you for your information!" : userData.email || "Your Email"}</p>
            )}
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 dark:bg-gray-800 max-w-52 p-1 rounded"
                type="text"
                placeholder="Enter your phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{showThankYou ? "Thank you for your information!" : userData.phone || "Your Phone"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className="text-neutral-500 dark:text-neutral-400 underline mt-3">
          BASIC INFORMATION
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 dark:text-neutral-300">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 dark:bg-gray-800 p-1 rounded"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{showThankYou ? "Thank you for your information!" : userData.gender || "Your Gender"}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100 dark:bg-gray-800 p-1 rounded"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-400">{showThankYou ? "Thank you for your information!" : userData.dob || "Your Birthday"}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex gap-4 justify-center">
        <button
          className="border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all"
          onClick={handleSave}
        >
          {isEdit ? "Save Information" : "Edit"}
        </button>
        <button className="border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all">
          Transaction History
        </button>
        <button className="border border-primary px-8 py-2 rounded hover:bg-primary hover:text-white transition-all">
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
