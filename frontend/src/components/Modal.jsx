export default function Modal({ children, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000
  },
  modal: {
    background: "#1f1f1f",
    padding: "25px",
    borderRadius: "12px",
    width: "420px",
    color: "white",
    position: "relative"
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "crimson",
    color: "white",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer"
  }
};
