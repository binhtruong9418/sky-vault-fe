interface PasswordStrengthProps {
    password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const requirements = [
        { regex: /.{8,}/, text: "At least 8 characters" },
        { regex: /[A-Z]/, text: "One uppercase letter" },
        { regex: /[a-z]/, text: "One lowercase letter" },
        { regex: /[0-9]/, text: "One number" },
        { regex: /[^A-Za-z0-9]/, text: "One special character" },
    ]

    const score = requirements.reduce((acc, req) => {
        return acc + (req.regex.test(password) ? 1 : 0)
    }, 0)

    const getStrengthColor = () => {
        if (score <= 1) return "bg-red-500"
        if (score <= 2) return "bg-orange-500"
        if (score <= 3) return "bg-yellow-500"
        if (score <= 4) return "bg-blue-500"
        return "bg-green-500"
    }

    const getStrengthText = () => {
        if (score <= 1) return "Very Weak"
        if (score <= 2) return "Weak"
        if (score <= 3) return "Fair"
        if (score <= 4) return "Good"
        return "Strong"
    }

    if (!password) return null

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(score / 5) * 100}%` }}
                    />
                </div>
                <span className="text-sm font-medium text-gray-600">{getStrengthText()}</span>
            </div>
            <div className="space-y-1">
                {requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <span className={`w-3 h-3 rounded-full ${req.regex.test(password) ? "bg-green-500" : "bg-gray-300"}`} />
                        <span className={req.regex.test(password) ? "text-green-600" : "text-gray-500"}>{req.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
