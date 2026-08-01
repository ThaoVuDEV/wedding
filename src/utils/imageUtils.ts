const getGoogleDriveDirectLink = (viewLink: string) => {
  const fileId = viewLink.split("/d/")[1]?.split("/")[0];
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};
