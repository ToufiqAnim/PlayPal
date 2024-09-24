


const BookingForm = ({ facilityId }: TFacilityIdProps) => {
    const [createBookings] = useCreateBookingsMutation();
    const submitBookingForm: SubmitHandler<FieldValues> = async (data) => {

        const bookingData = {
            ...data,
            date: moment(new Date(data.date)).format('YYYY-MM-DD'),
            startTime: moment(new Date(data.startTime)).format('HH:MM'),
            endTime: moment(new Date(data.endTime)).format('HH:MM'),
            facility: facilityId
        }

        try {
            const res = await createBookings(bookingData);

            if (res?.data.success) {

                toast.loading("Payment Processing ....")
                window.location.href = res.data?.data?.payment_url;
            } else {
                console.log(res);
                toast.error('Booking  failed!')
            }



        } catch (error:any) {
          
            toast.error(error?.data?.message)


        }

    }



    return (
        <Card>
            <h3 className="text-center text-xl font-bold">Booking Form</h3>
            <PForm onSubmit={submitBookingForm}  >
                <PDatePicker label="Date" name="date"></PDatePicker>
                <PTimePicker name="startTime" label="Start Time" />
                <PTimePicker name="endTime" label="End Time" />
                <Button type="primary" htmlType="submit">Proced to Pay</Button>

            </PForm>
        </Card>

    );
};

export default BookingForm;
