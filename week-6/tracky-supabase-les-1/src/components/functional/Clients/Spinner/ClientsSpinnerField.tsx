import { getClients } from "@core/modules/clients/api";
import { Client } from "@core/modules/clients/types";
import SpinnerField, { SpinnerFieldProps } from "@design/Form/SpinnerField";
import { useEffect, useState } from "react";

const ClientsSpinnerField = ({ ...props }: Omit<SpinnerFieldProps, "options">) => {
  const [clients, setClients] = useState<Client[] | null>();

  useEffect(() => {
    getClients()
      .then((data) => setClients(data))
      .catch((error) => console.error(error));
  }, []);

  if (!clients) {
    return null;
  }

  return (
    <SpinnerField
      {...props}
      options={clients.map((c) => ({
        label: c.name,
        value: c.id,
      }))}
    />
  );
};

export default ClientsSpinnerField;
