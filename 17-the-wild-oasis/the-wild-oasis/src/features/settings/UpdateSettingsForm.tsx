import { TSettingName } from "../../../types/remoteTypes";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";


function UpdateSettingsForm() {
  const { settings,isLoading } = useSettings();
  const {isUpdating,updateSetting} = useUpdateSetting();

  function handleUpdate(fieldName : TSettingName, e : React.FocusEvent<HTMLInputElement, Element>){

    if( settings && settings[fieldName] === +e.target.value) return;

    updateSetting({[fieldName]: +e.target.value});
  }

  if(isLoading) return <Spinner/>
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min_booking_length" defaultValue={settings?.min_booking_length} onBlur={ (e)=> handleUpdate("min_booking_length",e)} disabled={isUpdating} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max_booking_length" defaultValue={settings?.max_booking_length} onBlur={ (e)=> handleUpdate("max_booking_length",e)}disabled={isUpdating} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max_gusts_per_bookings" defaultValue={settings?.max_gusts_per_bookings} onBlur={ (e)=> handleUpdate("max_gusts_per_bookings",e)} disabled={isUpdating} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast_price" defaultValue={settings?.breakfast_price} onBlur={ (e)=> handleUpdate("breakfast_price",e)} disabled={isUpdating} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
