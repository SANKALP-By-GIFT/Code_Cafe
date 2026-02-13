export const submitBilling = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        message: "Payment Successful",
      });
    }, 1500);
  });
};
