'use client'

import { type State, createAnonURL } from "@/actions/anon/actions"
import { useActionState, useEffect, useState } from "react"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { Link, Scissors } from "../ui/icons"

export const Form = () => {
  const initialState: State = { status: 'idle', message: null, errors: {} }
  const [state, formAction, isPending] = useActionState(createAnonURL, initialState)
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (state.message) {
      setIsShown(true)

      const timeout = setTimeout(() => {
        setIsShown(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [state.message])

  const fieldErrors = state.errors?.['original-url'] || []

  return (
    <form noValidate action={formAction} className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        <div className="flex-1">
          <Input
            id="original-url-input"
            type="text"
            name="original-url"
            placeholder="https://example.com/very-long-url"
            leftIcon={<Link className="h-4 w-4" />}
            disabled={isPending}
            className="w-full dark:bg-neutral-950/50"
            aria-describedby={fieldErrors ? 'url-error' : undefined}
            aria-invalid={fieldErrors ? 'true' : 'false'}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          loading={isPending}
          leftIcon={!isPending ? <Scissors className="h-4 w-4" /> : undefined}
          className="sm:w-auto w-full"
        >
          {isPending ? 'Shortening...' : 'Shorten URL'}
        </Button>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {
          state.status === 'success' && state.message && isShown && (
            <p className="text-sm text-green-500">{state.message}</p>
          )
        }
        {fieldErrors && (
          <ul id="url-error" className="space-y-1">
            {fieldErrors.map(err => <li key={err} className="text-sm text-red-500">{err}</li>)}
          </ul>
        )}
      </div>
    </form>
  )
}
