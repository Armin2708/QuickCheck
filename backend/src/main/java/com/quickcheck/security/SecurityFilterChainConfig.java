package com.quickcheck.security;

import com.quickcheck.jwt.JWTAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityFilterChainConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public SecurityFilterChainConfig(AuthenticationProvider authenticationProvider, JWTAuthenticationFilter jwtAuthenticationFilter, AuthenticationEntryPoint authenticationEntryPoint) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth

                    .requestMatchers(
                            HttpMethod.POST,
                            "/api/users",
                            "/api/auth/login",
                            "/api/email/verify",
                            "/api/email/verify/code",
                            "/api/email/reset-password",
                            "/api/email/reset-password/code",
                            "/api/users/reset-password"
                    )
                    .permitAll()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/ping",
                                "api/users/*/profile-image",
                                "api/classes/*/image",
                                "/api/ws/**",
                                "/actuator/**"
                                )
                        .permitAll()



                        /*.requestMatchers(
                                HttpMethod.POST,
                                "/api/classrooms",
                                "/api/email/send"
                        )
                        .hasAnyAuthority("ADMIN","INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/classrooms"
                        )
                        .hasAnyAuthority("ADMIN","INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/classrooms"
                        )
                        .hasAnyAuthority("ADMIN","INSTRUCTOR")

*/

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/users/roles/",
                                "api/users/account-type/{userId}"
                        )
                        .hasAuthority("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/organizations"
                        )
                        .hasAuthority("ADMIN")


                        .anyRequest()
                    .authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .exceptionHandling(exceptions -> exceptions
                    .authenticationEntryPoint(authenticationEntryPoint)
                );
        return http.build();
    }

}
