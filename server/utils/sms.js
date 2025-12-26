// TEMPORARY MOCK SMS (NO ERROR)

module.exports = async (to, message) => {
  console.log("📩 SMS MOCK");
  console.log("To:", to);
  console.log("Message:", message);
};
