const { exec } = require("child_process");
const path = require("path");

const backupDB = () => {
  const date = new Date().toISOString().split("T")[0];

  const backupPath = path.join(
    __dirname,
    "backups",
    `clinic-backup-${date}.sql`
  );

  const command = `"${process.env.MYSQL_DUMP_PATH}" -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > "${backupPath}"`;

  exec(command, (error) => {
    if (error) {
      console.error("❌ Auto backup failed:", error);
    } else {
      console.log("✅ Auto DB backup created:", backupPath);
    }
  });
};

module.exports = backupDB;
