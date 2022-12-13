import styles from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <section className={styles["profile-container"]}>
      <div className={styles["profile-information"]}>
        <h1 className={styles["form-title"]}>User profile</h1>
        <div>Email: admin@admin.com</div>
        <div>Username: admin</div>
      </div>
    </section>
  );
};

export default UserProfile;
