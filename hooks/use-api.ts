// Custom hooks para uso dos serviços de API
// Esses hooks facilitam o uso dos serviços com estado de loading e erro

"use client"

import { useState, useCallback } from "react"
import type { ApiResponse } from "@/lib/api"

interface UseApiState<T> {
  data: T | null
  error: string | null
  isLoading: boolean
}

interface UseApiReturn<T, P extends unknown[]> extends UseApiState<T> {
  execute: (...params: P) => Promise<ApiResponse<T>>
  reset: () => void
}

// Hook genérico para chamadas de API
export function useApi<T, P extends unknown[] = []>(
  apiFunction: (...params: P) => Promise<ApiResponse<T>>
): UseApiReturn<T, P> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  })

  const execute = useCallback(
    async (...params: P): Promise<ApiResponse<T>> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await apiFunction(...params)

        if (response.success) {
          setState({ data: response.data, error: null, isLoading: false })
        } else {
          setState({ data: null, error: response.error, isLoading: false })
        }

        return response
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
        setState({ data: null, error: errorMessage, isLoading: false })
        return {
          data: null,
          error: errorMessage,
          status: 500,
          success: false,
        }
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false })
  }, [])

  return { ...state, execute, reset }
}

// Hook para chamadas que devem ser executadas automaticamente
export function useApiOnMount<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  dependencies: unknown[] = []
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: true,
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await apiFunction()

      if (response.success) {
        setState({ data: response.data, error: null, isLoading: false })
      } else {
        setState({ data: null, error: response.error, isLoading: false })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      setState({ data: null, error: errorMessage, isLoading: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFunction, ...dependencies])

  // Executar na montagem
  useState(() => {
    fetchData()
  })

  return { ...state, refetch: fetchData }
}

// Hook para mutations (criar, atualizar, excluir)
export function useMutation<T, P extends unknown[]>(
  mutationFunction: (...params: P) => Promise<ApiResponse<T>>,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: string) => void
  }
): {
  mutate: (...params: P) => Promise<ApiResponse<T>>
  isLoading: boolean
  error: string | null
  reset: () => void
} {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(
    async (...params: P): Promise<ApiResponse<T>> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await mutationFunction(...params)

        if (response.success && response.data) {
          options?.onSuccess?.(response.data)
        } else if (response.error) {
          setError(response.error)
          options?.onError?.(response.error)
        }

        setIsLoading(false)
        return response
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
        setError(errorMessage)
        options?.onError?.(errorMessage)
        setIsLoading(false)
        return {
          data: null,
          error: errorMessage,
          status: 500,
          success: false,
        }
      }
    },
    [mutationFunction, options]
  )

  const reset = useCallback(() => {
    setError(null)
  }, [])

  return { mutate, isLoading, error, reset }
}
