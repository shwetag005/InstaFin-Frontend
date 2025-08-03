import CommonModal from "../ui/CommonModal";
import CommonFields from "./CommonFields";

export const DynamicModalForm = ({
  isEditing,
  onClose=()=>{},
  onSubmit=()=>{},
  formData,
  setFormData,
  inputFields,
  handleInputChange,
}) => {
 

  return (
    <>
      <CommonModal
        open={isEditing}
        title="Edit User"
        saveText="Save"
        cancelText="Cancel"
        printText="Print" 
        showFooter
        modalData={formData}
        onSave={onSubmit}
        onCancel={onClose}
        onPrint={handlePrint} 
          
      >
        <CommonFields
          formData={formData}
          setFormData={setFormData}
          inputFields={inputFields}
          sectionKey={""}
          setSections={() => {}}
          onInputChange={handleInputChange}
        />

        
      </CommonModal>

     
   
    </>
  );
};
