import { useUser, SignUp } from '@clerk/nextjs'
import { PageLayout } from "~/components/layout";
import { Button } from "~/components/button";
import { TextField } from "~/components/textField";
import { Dropdown } from "~/components/dropdown";
import { SubtaskCheckbox } from "~/components/subtaskCheckbox";
import { useState } from "react";
import { api } from '~/utils/api';
import { useStores } from '~/models';
import { IProject, IProjectModel } from '~/models/ProjectsStore';
import { Instance } from 'mobx-state-tree';

export default function Home() {

  const { isLoaded, isSignedIn, user } = useUser()
  const [inputValue, setInputValue] = useState('')
  const [selected, setSelected] = useState('Doing')
  const [checked, setChecked] = useState(false)
  const { projects } = useStores()
  const { data, isLoading, refetch } = api.projects.getAll.useQuery()
  if (isLoading) return null
  if (!isLoaded) return null
  if (!isSignedIn) return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <SignUp />
    </div>
  )
  if (!user) return null
  if (!data) return null

  return (
    <>
      <PageLayout>
        <div className="flex justify-evenly h-full">
          <div className="h-full items-center justify-evenly flex flex-col">
            <Button loading={true} onPress={() => console.log("hello")} type="primary" size="sm" text="Light Button Primary S" />
            <Button onPress={() => console.log("hello")} type="primary" size="sm" text="Light Button Primary S" />
            <Button onPress={() => console.log("Hello")} type="primary" size="lg" text="Light Button Primary L" />
            <Button onPress={() => console.log("Hello")} type="primary" size="sm" text="dark Button Primary S" />
            <Button onPress={() => console.log("Hello")} type="primary" size="lg" text="dark Button Primary L" />
            <Button onPress={() => console.log("Hello")} type="secondary" size="sm" text="Light Button secondary S" />
            <Button loading={true} onPress={() => console.log("Hello")} type="secondary" size="sm" text="Light Button secondary S" />
            <Button onPress={() => console.log("Hello")} type="secondary" size="lg" text="Light Button secondary L" />
            <Button onPress={() => console.log("Hello")} type="secondary" size="sm" text="dark Button secondary S" />
            <Button onPress={() => console.log("Hello")} type="secondary" size="lg" text="dark Button secondary L" />
            <Button loading={true} onPress={() => console.log("Hello")} type="destructive" size="sm" text="Light Button destructive S" />
            <Button onPress={() => console.log("Hello")} type="destructive" size="sm" text="Light Button destructive S" />
            <Button onPress={() => console.log("Hello")} type="destructive" size="lg" text="Light Button destructive L" />
            <Button onPress={() => console.log("Hello")} type="destructive" size="sm" text="dark Button destructive S" />
            <Button onPress={() => console.log("Hello")} type="destructive" size="lg" text="dark Button destructive L" />
          </div>
          <div className="h-full items-center justify-evenly flex flex-col">
            <TextField canBeEmpty={false} value={inputValue} setValue={setInputValue} isValid={() => false} />
          </div>
          <div className="h-full items-center justify-evenly flex flex-col">
            <Dropdown options={['Todo', 'Doing', 'Done']} selected={selected} setSelected={setSelected} />
          </div>
          <div className="h-full items-center justify-evenly flex flex-col w-64">
            <SubtaskCheckbox checked={checked} setChecked={setChecked} text={"Hello"} />
          </div>
        </div>
      </PageLayout>
    </>
  );
}
