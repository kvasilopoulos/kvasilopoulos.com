import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import data from "../data/data.json"

// Register fonts
Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7.woff2', fontWeight: 600 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1pL7.woff2', fontWeight: 700 },
    ],
})

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 8,
        color: '#000000',
    },
    title: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 16,
    },
    contactInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    contactItem: {
        fontSize: 10,
        color: '#666666',
        marginHorizontal: 4,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 12,
        color: '#000000',
    },
    expertiseGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    expertiseItem: {
        width: '50%',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    expertiseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#000000',
        marginTop: 6,
        marginRight: 8,
    },
    expertiseText: {
        fontSize: 10,
        color: '#333333',
        flex: 1,
    },
    experienceItem: {
        marginBottom: 16,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#e0e0e0',
    },
    company: {
        fontSize: 14,
        fontWeight: 600,
        color: '#000000',
        marginBottom: 4,
    },
    role: {
        fontSize: 12,
        fontWeight: 500,
        color: '#333333',
        marginBottom: 4,
    },
    period: {
        fontSize: 10,
        color: '#666666',
        marginBottom: 4,
    },
    description: {
        fontSize: 10,
        color: '#666666',
        marginBottom: 4,
    },
    technologies: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    technology: {
        fontSize: 8,
        color: '#666666',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
    },
    educationItem: {
        marginBottom: 12,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#e0e0e0',
    },
    degree: {
        fontSize: 12,
        fontWeight: 500,
        color: '#333333',
        marginBottom: 2,
    },
    school: {
        fontSize: 10,
        color: '#666666',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    skillCategory: {
        width: '33.33%',
        padding: 8,
    },
    categoryTitle: {
        fontSize: 12,
        fontWeight: 500,
        color: '#333333',
        marginBottom: 4,
    },
    skillItem: {
        fontSize: 10,
        color: '#666666',
        marginBottom: 2,
    },
})

export const CVPDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{data.personal.name}</Text>
                <Text style={styles.title}>{data.personal.title}</Text>
                <View style={styles.contactInfo}>
                    {data.contact.socialLinks.map((link, index) => (
                        <Text key={link.name} style={styles.contactItem}>
                            {link.username}
                            {index < data.contact.socialLinks.length - 1 && " • "}
                        </Text>
                    ))}
                </View>
            </View>

            {/* Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                {data.personal.about.map((paragraph, index) => (
                    <Text key={index} style={styles.description}>
                        {paragraph}
                    </Text>
                ))}
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {Array.from(new Set(data.experience.map(exp => exp.company))).map(company => {
                    const companyExperiences = data.experience
                        .filter(exp => exp.company === company)
                        .sort((a, b) => {
                            const dateA = new Date(a.period.split(' - ')[0]);
                            const dateB = new Date(b.period.split(' - ')[0]);
                            return dateB.getTime() - dateA.getTime();
                        });

                    return (
                        <View key={company} style={styles.experienceItem}>
                            <Text style={styles.company}>{company}</Text>
                            {companyExperiences.map((exp, index) => (
                                <View key={index}>
                                    <Text style={styles.role}>{exp.title}</Text>
                                    <Text style={styles.period}>{exp.period}</Text>
                                    {exp.description.map((desc, i) => (
                                        <Text key={i} style={styles.description}>
                                            • {desc}
                                        </Text>
                                    ))}
                                    <View style={styles.technologies}>
                                        {exp.technologies.map((tech, i) => (
                                            <Text key={i} style={styles.technology}>
                                                {tech}
                                            </Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                })}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.personal.education.map((edu, index) => (
                    <View key={index} style={styles.educationItem}>
                        <Text style={styles.degree}>{edu.degree}</Text>
                        <Text style={styles.school}>{edu.school} • {edu.period}</Text>
                    </View>
                ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsGrid}>
                    {Array.from(new Set(data.skills.map((skill) => skill.category))).map((category) => (
                        <View key={category} style={styles.skillCategory}>
                            <Text style={styles.categoryTitle}>{category}</Text>
                            {data.skills
                                .filter((skill) => skill.category === category)
                                .map((skill) => (
                                    <Text key={skill.name} style={styles.skillItem}>
                                        {skill.name} ({skill.level}%)
                                    </Text>
                                ))}
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
) 