import * as React from "react";
import * as Paper from "@/components/PaperContainer";
import * as Pages from "@/components/Pages";
import * as Icons from "@tabler/icons-react";

import { NavigationBackToLobby } from "./NavigationBackToLobby";
import { CompanyAdmins } from "./CompanyAdmins";
import { useLoadedData } from "./loader";
import { OptionsMenu, OptionsMenuItem } from "./OptionsMenu";
import { createPath } from "@/utils/paths";
import { useMe } from "@/contexts/CurrentUserContext";

export function Page() {
  const me = useMe();
  const { company } = useLoadedData();

  return (
    <Pages.Page title={[company.name, "Admininstration"]}>
      <Paper.Root size="small">
        <NavigationBackToLobby />

        <Paper.Body minHeight="none">
          <div className="uppercase text-sm text-content-dimmed">Company Admininstration</div>
          <div className="text-content-accent text-3xl font-extrabold">{company.name}</div>

          <div className="text-content-accent font-bold mt-8 text-lg">What's this?</div>
          <p>
            This is the company administration page where owners and admins can manage the company's settings. They have
            special permissions to add or remove people, change who can access the applicacation, and more. If you need
            something done, contact one of them.
          </p>

          <CompanyAdmins />

          {me.companyRole === "admin" && <Menu />}
        </Paper.Body>
      </Paper.Root>
    </Pages.Page>
  );
}

function Menu() {
  const manageTrustedDomains = createPath("company", "admin", "manageTrustedEmailDomains");
  const managePeople = createPath("company", "admin", "managePeople");
  const manageAdmins = createPath("company", "admin", "manageAdmins");

  return (
    <div className="mt-12">
      <OptionsMenu>
        <OptionsMenuItem linkTo={manageTrustedDomains} icon={Icons.IconLock} title="Manage Trusted Email Domains" />
        <OptionsMenuItem linkTo={managePeople} icon={Icons.IconUsers} title="Add/Remove People Manually" />
        <OptionsMenuItem linkTo={manageAdmins} icon={Icons.IconUserShield} title="Manage Company Administrators" />
      </OptionsMenu>
    </div>
  );
}
