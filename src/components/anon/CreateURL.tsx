'use client'

import { type State, createAnonURL } from "@/actions/anon/actions"
import { useActionState, useEffect, useState } from "react"
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

        <label htmlFor="anon-url" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Shorten URL</label>
        <div className="relative flex-1 flex flex-wrap  items-center gap-4 justify-center">
          <div className="relative flex-1 flex flex-wrap  items-center gap-4 justify-center">
            <div className="absolute  top-2.5 bottom-2.5 start-0 inline-flex items-center ps-3 pointer-events-none">
              <Link className="h-4 w-4" />
            </div>
            <input type="text" id="anon-url" className="block w-full p-4 ps-10 text-sm text-neutral-900 border border-neutral-300 rounded-md bg-neutral-50 focus:ring-lime-500 focus:border-lime-500 dark:bg-neutral-900 dark:border-neutral-800 dark:placeholder-neutral-400 dark:text-white outline-none dark:focus:ring-lime-500 dark:focus:border-lime-500 focus-visible:ring-2 focus-visible:ring-lime-500 dark:focus-visible:ring-offset-neutral-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 read-only:cursor-default read-only:focus-visible:ring-0 file:border-0 file:bg-transparent file:text-sm file:font-medium transition-all duration-200" placeholder="https://example.com/very-long-url" required disabled={isPending} aria-describedby={fieldErrors ? 'url-error' : undefined}
              aria-invalid={fieldErrors ? 'true' : 'false'}
              name='original-url'
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            loading={isPending}
            leftIcon={!isPending ? <Scissors className="h-4 w-4" /> : undefined}
            className="sm:w-auto w-full sm:absolute end-2.5"
          >
            {isPending ? 'Shortening...' : 'Shorten URL'}
          </Button>
        </div>


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
