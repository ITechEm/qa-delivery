'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import EditableImage from "@/components/layout/EditableImage";
import {useProfile} from "@/components/UseProfile";
import {useState} from "react";

export default function UserForm({user,onSave}) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const {data:loggedInUserData} = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  } 

  return (
    <div className="md:flex gap-4 item-center">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name:userName, image, phone, admin,
            streetAddress, city, country, postalCode,
          })
        }
      >
        <label data-testid="username" className="ml-2 inria">
        First and last name
        </label>
        <input
          type="text" disabled={false} placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)} minLength={0} maxLength={15}
        />
        <label className="ml-2 inria">Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder={'Email'}
        />
        <AddressInputs className="inria"
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2 inria" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button data-testid="saveprofilebtn" className="mt-8" type="submit">Save</button>
      </form>
    </div>
  );
}