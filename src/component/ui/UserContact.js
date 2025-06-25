const UserContact = ({ mobileNumber, role }) => (
    <div className="text-gray-800 text-sm font-medium">
      {mobileNumber} <span className="text-xs text-gray-400 font-normal">{role}</span>
    </div>
  );
  export default UserContact;
  