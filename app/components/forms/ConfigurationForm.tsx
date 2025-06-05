import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

import Description from '../basics/Description';
import FormContent from "../containers/FormContent";
import Title from "../basics/Title";
import Button from "../basics/Button";
import SellersTable from "../tables/SellersTable";
import SkeletonConfiguration from "../skeletons/SkeletonConfiguration";
import Notification from "../basics/Notification";
import { Plus } from "lucide-react";

interface ConfigurationI {
    id: string;
    sellers: string[];
    created_at: string;
}

interface FormConfigurationProps {
    configData?: ConfigurationI | null;
    edit?: boolean;
    loading?: boolean;
}

export default function ConfigurationForm({ configData, edit, loading }: FormConfigurationProps) {
    const fetcher = useFetcher();
    const refetcher = useFetcher();

    const isLoading = fetcher.state !== "idle";
    const [newSeller, setNewSeller] = useState("");
    const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [configuration, setConfiguration] = useState<ConfigurationI>({
        id: "",
        sellers: ["Abraham Rios", "Robert Riera", "Jorge Fernandez"],
        created_at: ""
    });

    // Inicializa con datos cargados
    useEffect(() => {
        if (configData) {
            setConfiguration(configData);
        }
    }, [configData]);

    // Cuando cambia fetcher.data, muestra notificación y dispara refetch
    useEffect(() => {
        if (fetcher.data) {
            //@ts-ignore
            if (fetcher.data?.error) {
                //@ts-ignore
                setNotification({ type: "error", message: fetcher.data?.error });
            } else {
                setNotification({
                    type: "success",
                    //@ts-ignore
                    message: `Configuration ${edit ? "edited" : "saved"} successfully, ID: ${fetcher.data.id}`
                });
                // Refetch para obtener la data actualizada
                refetcher.load("/api/configuration");
            }
        }
    }, [fetcher.data, edit]);

    // Cuando llega la data del refetch, actualiza el estado local
    useEffect(() => {
        if (refetcher.data) {
            const data = Array.isArray(refetcher.data) && refetcher.data.length > 0 ? refetcher.data[0] : null;
            if (data) {
                setConfiguration(data);
            }
        }
    }, [refetcher.data]);

    const onSubmit = () => {
        const { id, created_at, ...cleanedConfig } = configuration;
        const configResult = JSON.stringify(cleanedConfig);

        if (edit && id) {
            fetcher.submit(
                { configuration: configResult },
                {
                    method: "put",
                    action: `/api/configuration/${id}`,
                    encType: "application/x-www-form-urlencoded",
                }
            );
        } else {
            fetcher.submit(
                { configuration: configResult },
                {
                    method: "post",
                    action: "/api/configuration",
                    encType: "application/x-www-form-urlencoded",
                }
            );
        }
    };

    const handleAddSeller = () => {
        const trimmed = newSeller.trim();
        if (!trimmed) return;

        if (configuration.sellers.includes(trimmed)) {
            setNotification({
                type: "error",
                message: `Seller already exists`
            });
            return;
        }

        setConfiguration((prev) => ({
            ...prev,
            sellers: [...prev.sellers, trimmed]
        }));
        setNewSeller("");
    };

    const handleRemoveSeller = (seller: string) => {
        setConfiguration((prev) => ({
            ...prev,
            sellers: prev.sellers.filter((s) => s !== seller),
        }));
    };

    return (
        <>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <Title>SELLERS</Title>
            <Description>
                Add or remove sellers that will be available when creating a proposal
            </Description>

            {/* Input + Add Button */}
            <FormContent singleColumn={true}>
                <div className="flex gap-2">
                    <input
                        id="newSeller"
                        type="text"
                        className="flex-grow p-2 border rounded bg-white text-black"
                        value={newSeller}
                        onChange={(e) => setNewSeller(e.target.value)}
                        placeholder="Enter seller name"
                        disabled={loading}
                    />
                    <button
                        onClick={handleAddSeller}
                        className="bg-primary text-white px-3 rounded px-4 py-2 hover:bg-primary/90 transition flex items-center gap-2"
                        type="button"
                        disabled={loading}
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </FormContent>

            {/* Sellers Table or Skeleton */}
            {loading ? (
                <SkeletonConfiguration />
            ) : (
                <SellersTable sellers={configuration.sellers} onDelete={handleRemoveSeller} />
            )}

            {/* Spacer and Save Button */}
            <div className="mt-6">
                <Button onClick={onSubmit} loading={isLoading || loading}>
                    {edit ? 'Update' : 'Save'} Changes
                </Button>
            </div>
        </>
    );
}